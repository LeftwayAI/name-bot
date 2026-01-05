import { NextRequest, NextResponse } from 'next/server';

// Using DNS lookup as a simple availability check
// A domain with no DNS records is likely available
async function checkDomainAvailability(domain: string): Promise<{
  domain: string;
  available: boolean;
  checked: boolean;
}> {
  try {
    // Import node DNS module
    const dns = await import('dns').then(m => m.promises);

    // Try to resolve the domain
    // If it resolves, it's registered. If it fails, it might be available.
    try {
      await dns.resolve(domain);
      // Domain resolves, so it's registered
      return {
        domain,
        available: false,
        checked: true
      };
    } catch (err: any) {
      // ENOTFOUND means domain doesn't resolve - likely available
      if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
        return {
          domain,
          available: true,
          checked: true
        };
      }
      // Other errors - couldn't check
      return {
        domain,
        available: false,
        checked: false
      };
    }
  } catch (error) {
    console.error('Domain check error:', error);
    return {
      domain,
      available: false,
      checked: false
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { names } = await req.json();

    if (!names || !Array.isArray(names)) {
      return NextResponse.json(
        { error: 'Invalid request. Provide an array of names.' },
        { status: 400 }
      );
    }

    // Check each name with common TLDs
    const tlds = ['.com', '.io', '.app', '.ai', '.co'];
    const results: Array<{
      name: string;
      domains: Array<{
        domain: string;
        available: boolean;
        checked: boolean;
      }>;
    }> = [];

    for (const name of names.slice(0, 10)) { // Limit to 10 names
      const domains = [];

      for (const tld of tlds) {
        const domain = `${name.toLowerCase().replace(/\s+/g, '')}${tld}`;
        const result = await checkDomainAvailability(domain);
        domains.push(result);
      }

      results.push({
        name,
        domains
      });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}
