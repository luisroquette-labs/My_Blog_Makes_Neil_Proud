import { AUTOBLOG_PROFILE } from '@/lib/autoblog-profile';
import { buildShareUrls, hasPrimaryCta, resolveCtaVariant } from '@/lib/blog/cta';
import CtaButton from '@/components/blog/CtaButton';

interface EndCtaProps {
  title: string;
  slug: string;
}

const SHARE_BUTTON_CLASS =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-semibold text-sm text-foreground transition-all hover:border-primary hover:text-primary';

export default function EndCta({ title, slug }: EndCtaProps) {
  const { cta } = AUTOBLOG_PROFILE;
  const url = `${AUTOBLOG_PROFILE.brand.siteUrl}/blog/${slug}`;

  // eslint-disable-next-line react-hooks/purity
  const weekIndex = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const variantIndex = resolveCtaVariant(slug, weekIndex, cta.variants);
  const active = variantIndex !== null ? cta.variants[variantIndex] : null;

  if (active || hasPrimaryCta(cta.url)) {
    const display = active ?? cta;
    return (
      <div className="mt-12 p-6 rounded-2xl border border-primary/30 bg-primary/5 text-center">
        <p className="font-semibold text-foreground mb-2">{display.title}</p>
        <p className="text-sm text-muted-foreground mb-4">{display.subtitle}</p>
        <CtaButton
          href={display.url}
          label={display.buttonLabel}
          slug={slug}
          variant={variantIndex !== null ? `v${variantIndex + 1}` : 'padrao'}
        />
      </div>
    );
  }

  const share = buildShareUrls(url, title);
  return (
    <div className="mt-12 p-6 rounded-2xl border border-primary/30 bg-primary/5">
      <p className="font-semibold text-foreground mb-4 text-center">
        Este artigo ajudou? Compartilhe com alguém que precisa dele.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href={share.x} target="_blank" rel="noopener noreferrer" className={SHARE_BUTTON_CLASS}>
          X
        </a>
        <a
          href={share.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={SHARE_BUTTON_CLASS}
        >
          WhatsApp
        </a>
        <a
          href={share.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={SHARE_BUTTON_CLASS}
        >
          LinkedIn
        </a>
        {AUTOBLOG_PROFILE.editorial.newsletterUrl.trim() && (
          <a
            href={AUTOBLOG_PROFILE.editorial.newsletterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-2.5 font-semibold text-sm transition-all"
          >
            Receber novidades
          </a>
        )}
      </div>
    </div>
  );
}
