import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Mark this route as dynamic to prevent build-time execution
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Initialize Stripe and get webhook secret at runtime
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    if (!stripeKey) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-12-15.clover",
    });

    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle successful checkout completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract the name and domain from metadata
      const name = session.metadata?.nameName || "Your Name";
      const domain = session.metadata?.domain || "yourdomain.com";
      const customerEmail = session.customer_details?.email;

      if (!customerEmail) {
        console.error("No customer email found in session");
        return NextResponse.json(
          { error: "No customer email" },
          { status: 400 }
        );
      }

      // Generate the Premium Name Package content
      const packageContent = generatePremiumPackage(name, domain);

      // Send email with the Premium Package
      try {
        if (!process.env.RESEND_API_KEY) {
          console.error("RESEND_API_KEY not configured");
          // Don't fail the webhook - just log the error
          return NextResponse.json({ received: true, warning: "Email not configured" });
        }

        // Import Resend dynamically to avoid build-time issues
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Rose Glass <orders@rose.glass>",
          to: customerEmail,
          subject: `Your Premium Name Package: ${name}`,
          html: packageContent,
        });

        console.log(`Premium Package sent to ${customerEmail} for ${name}`);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't return error to Stripe - we'll handle failed emails separately
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

function generatePremiumPackage(name: string, domain: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #4F46E5; border-bottom: 3px solid #4F46E5; padding-bottom: 10px; }
    h2 { color: #6366F1; margin-top: 30px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
    .section { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5; }
    .checklist { list-style: none; padding: 0; }
    .checklist li { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .checklist li:before { content: "✓ "; color: #10b981; font-weight: bold; margin-right: 10px; }
    .highlight { background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 15px 0; }
    .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="color: white; border: none; margin: 0;">🎉 Your Premium Name Package</h1>
    <p style="font-size: 24px; margin: 10px 0 0 0; font-weight: bold;">${name}</p>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">${domain}</p>
  </div>

  <p>Congratulations on choosing <strong>${name}</strong> for your brand! This comprehensive package will guide you through establishing your brand identity and securing your online presence.</p>

  <div class="section">
    <h2>📋 Brand Strategy Overview</h2>
    <p>Your name <strong>${name}</strong> has unique strengths that you should leverage:</p>
    <ul>
      <li><strong>Memorability:</strong> Short, distinctive names are easier to remember and share. Use this in your marketing.</li>
      <li><strong>Pronunciation:</strong> Ensure your name is easy to say across different languages if you plan to expand globally.</li>
      <li><strong>Emotional Resonance:</strong> Every brand name evokes feelings. Consider what emotions ${name} triggers and align your messaging accordingly.</li>
    </ul>
  </div>

  <div class="section">
    <h2>🌐 Domain Acquisition Guide</h2>
    <p>Here's your step-by-step process to secure <strong>${domain}</strong>:</p>
    <ol>
      <li><strong>Choose a registrar:</strong> Namecheap, Google Domains, or Cloudflare (lowest prices)</li>
      <li><strong>Search for ${domain}</strong> on your chosen registrar</li>
      <li><strong>Check pricing:</strong> First year is usually discounted, note renewal price</li>
      <li><strong>Add privacy protection:</strong> Hides your personal info from WHOIS lookup (often free)</li>
      <li><strong>Configure DNS:</strong> Point to your hosting provider or use Cloudflare for free CDN</li>
      <li><strong>Set up email forwarding:</strong> Create contact@${domain} immediately</li>
    </ol>

    <div class="highlight">
      <strong>💡 Pro Tip:</strong> Buy variations (.com, .io, .app) to prevent competitors from using similar names. At minimum, secure the .com if available.
    </div>
  </div>

  <div class="section">
    <h2>📱 Social Media Handle Report</h2>
    <p>Secure these handles IMMEDIATELY (even if you're not ready to post):</p>

    <table>
      <thead>
        <tr>
          <th>Platform</th>
          <th>Recommended Handle</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Instagram</td>
          <td>@${name.toLowerCase().replace(/\s+/g, '')}</td>
          <td>Check availability at instagram.com</td>
        </tr>
        <tr>
          <td>Twitter/X</td>
          <td>@${name.toLowerCase().replace(/\s+/g, '')}</td>
          <td>Check availability at x.com</td>
        </tr>
        <tr>
          <td>LinkedIn</td>
          <td>/company/${name.toLowerCase().replace(/\s+/g, '-')}</td>
          <td>Create company page</td>
        </tr>
        <tr>
          <td>TikTok</td>
          <td>@${name.toLowerCase().replace(/\s+/g, '')}</td>
          <td>Check availability at tiktok.com</td>
        </tr>
        <tr>
          <td>YouTube</td>
          <td>@${name.toLowerCase().replace(/\s+/g, '')}</td>
          <td>Create channel immediately</td>
        </tr>
      </tbody>
    </table>

    <ul class="checklist">
      <li>Use the EXACT same handle across all platforms for brand consistency</li>
      <li>If your preferred handle is taken, add "HQ", "Official", or your industry (e.g., @${name.toLowerCase()}Tech)</li>
      <li>Complete all profile bios with consistent messaging</li>
      <li>Upload the same profile picture across all platforms</li>
    </ul>
  </div>

  <div class="section">
    <h2>🎨 Visual Identity Recommendations</h2>
    <p>Based on your brand name <strong>${name}</strong>, here are professional design guidelines:</p>

    <h3>Color Palette Suggestions</h3>
    <ul>
      <li><strong>Modern Tech:</strong> Deep blues (#0F172A) + electric blue accent (#3B82F6)</li>
      <li><strong>Creative/Playful:</strong> Vibrant purple (#7C3AED) + coral (#F97316)</li>
      <li><strong>Professional/Trust:</strong> Navy (#1E3A8A) + gold accent (#F59E0B)</li>
      <li><strong>Eco/Natural:</strong> Forest green (#047857) + earth tones (#92400E)</li>
    </ul>

    <h3>Typography Guidelines</h3>
    <ul>
      <li><strong>Logo Font:</strong> Choose a bold, modern sans-serif (Inter, Poppins, Montserrat)</li>
      <li><strong>Body Text:</strong> Clean, readable font (Inter, Open Sans, System UI)</li>
      <li><strong>Consistency:</strong> Use max 2 font families across all materials</li>
    </ul>

    <h3>Logo Creation Checklist</h3>
    <ul class="checklist">
      <li>Create vector logo (SVG format) for scalability</li>
      <li>Design versions: full logo, icon-only, horizontal, vertical</li>
      <li>Prepare light and dark mode versions</li>
      <li>Export in multiple sizes: favicon (32x32), social media (1200x630), print (high-res PDF)</li>
      <li>Test logo at very small sizes (16x16px) to ensure legibility</li>
    </ul>

    <div class="highlight">
      <strong>🎯 Quick Start:</strong> Use Canva Pro ($13/month) or Figma (free) to create your initial logo. Hire a designer on Fiverr ($50-200) for polish once you validate your business.
    </div>
  </div>

  <div class="section">
    <h2>📧 Brand Announcement Email Templates</h2>

    <h3>Template 1: Launching to Existing Audience</h3>
    <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 15px 0;">
      <p><strong>Subject:</strong> Introducing ${name} - [One-line description]</p>
      <p>Hi [Name],</p>
      <p>I'm excited to announce <strong>${name}</strong> - [brief description of what you do].</p>
      <p>After [months/years] of work, we're finally ready to [solve problem] for [target audience].</p>
      <p><strong>What makes ${name} different:</strong></p>
      <ul>
        <li>[Key differentiator 1]</li>
        <li>[Key differentiator 2]</li>
        <li>[Key differentiator 3]</li>
      </ul>
      <p>[Call to action - visit site, sign up, pre-order, etc.]</p>
      <p>Thanks for being part of this journey!</p>
      <p>[Your Name]<br>Founder, ${name}</p>
    </div>

    <h3>Template 2: Cold Outreach / Press Release</h3>
    <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 15px 0;">
      <p><strong>Subject:</strong> ${name} Launches to [Solve Specific Problem]</p>
      <p><strong>${name}</strong>, a new [category] company, announced today the launch of [product/service].</p>
      <p>The platform addresses [specific pain point] by [unique solution]. Unlike existing solutions that [common limitation], ${name} offers [key innovation].</p>
      <p>"[Quote about why you built this and the problem it solves]," said [Your Name], Founder of ${name}.</p>
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>[Feature 1 and benefit]</li>
        <li>[Feature 2 and benefit]</li>
        <li>[Feature 3 and benefit]</li>
      </ul>
      <p>For more information, visit ${domain}</p>
    </div>
  </div>

  <div class="section">
    <h2>⚖️ Trademark Search Guidance</h2>
    <p>Before investing heavily in <strong>${name}</strong>, perform a preliminary trademark search:</p>

    <ol>
      <li><strong>Free Search - USPTO Database (US):</strong>
        <ul>
          <li>Visit <a href="https://tmsearch.uspto.gov">tmsearch.uspto.gov</a></li>
          <li>Search for "${name}" in your industry class</li>
          <li>Check for exact matches and similar names</li>
        </ul>
      </li>
      <li><strong>Google Search:</strong>
        <ul>
          <li>Search "${name} [your industry]" to see if anyone is using it</li>
          <li>Check if there are established businesses with similar names</li>
        </ul>
      </li>
      <li><strong>International Checks (if going global):</strong>
        <ul>
          <li>EU: <a href="https://euipo.europa.eu">euipo.europa.eu</a></li>
          <li>UK: <a href="https://www.gov.uk/search-for-trademark">gov.uk/search-for-trademark</a></li>
        </ul>
      </li>
      <li><strong>When to hire a trademark attorney:</strong>
        <ul>
          <li>You find potential conflicts and need professional assessment</li>
          <li>You're raising funding or planning rapid expansion</li>
          <li>You want to formally register the trademark ($225+ USPTO fees + $500-2000 attorney)</li>
        </ul>
      </li>
    </ol>

    <div class="highlight">
      <strong>⚠️ Important:</strong> This package provides guidance, not legal advice. For formal trademark registration, consult a trademark attorney. Many offer free initial consultations.
    </div>
  </div>

  <div class="section">
    <h2>✅ 30-Day Launch Checklist</h2>
    <p>Follow this timeline to establish your brand professionally:</p>

    <h3>Week 1: Secure Your Assets</h3>
    <ul class="checklist">
      <li>Purchase ${domain} and configure DNS</li>
      <li>Register all social media handles</li>
      <li>Set up professional email (hello@${domain})</li>
      <li>Perform preliminary trademark search</li>
    </ul>

    <h3>Week 2: Build Visual Identity</h3>
    <ul class="checklist">
      <li>Design logo (DIY or hire designer)</li>
      <li>Choose brand colors and create style guide</li>
      <li>Create social media graphics templates</li>
      <li>Update all social profiles with consistent branding</li>
    </ul>

    <h3>Week 3: Launch Preparation</h3>
    <ul class="checklist">
      <li>Build simple landing page on ${domain}</li>
      <li>Write brand story and mission statement</li>
      <li>Prepare announcement emails</li>
      <li>Create initial social media content calendar</li>
    </ul>

    <h3>Week 4: Go Live</h3>
    <ul class="checklist">
      <li>Announce on social media</li>
      <li>Send launch emails to your network</li>
      <li>Submit to relevant directories (Product Hunt, etc.)</li>
      <li>Start engaging with your target audience</li>
    </ul>
  </div>

  <div class="section">
    <h2>📚 Additional Resources</h2>
    <ul>
      <li><strong>Logo Design:</strong> Canva, Figma, or hire on Fiverr/99designs</li>
      <li><strong>Domain Registrars:</strong> Namecheap, Cloudflare, Porkbun</li>
      <li><strong>Email Setup:</strong> Google Workspace ($6/user/month), Proton Mail (free tier)</li>
      <li><strong>Website Builders:</strong> Webflow, Framer, Vercel (for developers)</li>
      <li><strong>Social Media Management:</strong> Buffer, Later (free tiers available)</li>
      <li><strong>Trademark Attorneys:</strong> LegalZoom, Rocket Lawyer, or local IP attorney</li>
    </ul>
  </div>

  <div class="highlight">
    <h2>🚀 Next Steps</h2>
    <ol>
      <li><strong>Secure your domain ASAP</strong> - domains can be registered by others quickly</li>
      <li><strong>Register social handles</strong> - takes 15 minutes, prevents squatters</li>
      <li><strong>Start building</strong> - your landing page doesn't need to be perfect to launch</li>
    </ol>
    <p style="margin-top: 15px;"><strong>Need help?</strong> Reply to this email with questions - we're here to support your success!</p>
  </div>

  <div class="footer">
    <p><strong>${name}</strong> - Premium Name Package</p>
    <p>Generated by <a href="https://rose.glass" style="color: #4F46E5; text-decoration: none;">Rose Glass</a></p>
    <p style="font-size: 14px; margin-top: 20px;">Questions? Reply to this email or contact support@rose.glass</p>
  </div>
</body>
</html>
  `;
}
