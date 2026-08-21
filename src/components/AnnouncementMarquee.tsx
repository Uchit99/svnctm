interface AnnouncementMarqueeProps {
  message?: string;
}

const defaultMessage = 'SVNCTM ✦ EST. 2026 ✦ NEW COLLECTION ✦ DESIGNED FOR THE UNCOMMON ✦ MOVE DIFFERENT ✦ SVNCTM';

export function AnnouncementMarquee({ message = defaultMessage }: AnnouncementMarqueeProps) {
  return (
    <aside className="announcement-marquee" aria-label={message}>
      <div className="announcement-marquee__track" aria-hidden="true">
        <div className="announcement-marquee__group"><span>{message}</span></div>
        <div className="announcement-marquee__group"><span>{message}</span></div>
      </div>
    </aside>
  );
}
