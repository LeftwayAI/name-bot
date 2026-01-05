import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'user',
          content: `You are a creative naming expert. Generate 10 unique, memorable, and catchy names for the following project description. Make the names brandable, easy to remember, and relevant to the description.

Project description: ${description}

Return ONLY the names, one per line, without numbering or additional explanation. Make them creative and professional.`,
        },
      ],
      max_tokens: 1024,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in response');
    }

    const names = content
      .split('\n')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    return NextResponse.json({ names });
  } catch (error) {
    console.error('Error generating names:', error);
    return NextResponse.json(
      { error: 'Failed to generate names' },
      { status: 500 }
    );
  }
}
