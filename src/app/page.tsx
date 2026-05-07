import Image from "next/image";
import SideFrames from "@/components/side-frames";
import Countdown from "@/components/countdown";
import RSVPForm from "@/components/rsvp-form";
import SectionNav from "@/components/section-nav";
import styles from "./page.module.css";
import {
  directions,
  eventDetails,
  faqItems,
  heroContent,
  registryDetails,
  storyMilestones,
  travelDetails,
} from "@/lib/wedding-data";

const navItems = [
  { id: "story", label: "Our Story" },
  { id: "details", label: "Details" },
  { id: "directions", label: "Directions" },
  { id: "rsvp", label: "RSVP" },
  { id: "registry", label: "Registry" },
  { id: "travel", label: "Travel & Accommodations" },
  { id: "faq", label: "FAQ" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <SideFrames />
      <main className={styles.main}>
        <SectionNav
          items={navItems}
          className={styles.nav}
          brandClassName={styles.brand}
          brandLinkClassName={styles.brandLink}
          navLinksClassName={styles.navLinks}
          linkClassName={styles.navLink}
          activeLinkClassName={styles.navLinkActive}
        />

        <section className={styles.hero} id="home">
          <Image
            className={styles.heroBg}
            src="/LEM00118.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Together with their families</p>
              <h1 className={styles.heroTitle}>{heroContent.couple}</h1>
              <p className={styles.heroSubtitle}>
                Request the pleasure of your company at their wedding celebration.
              </p>

              <div className={styles.heroMeta}>
                <div className={styles.metaCard}>
                  <span>Date</span>
                  <strong>{heroContent.date}</strong>
                </div>
                <div className={styles.metaCard}>
                  <span>Venue</span>
                  <strong>{heroContent.venue}</strong>
                </div>
                <div className={styles.metaCard}>
                  <span>Location</span>
                  <strong>{heroContent.location}</strong>
                </div>
              </div>

              <Countdown targetDate={heroContent.isoDate} />

              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#rsvp">
                  RSVP Now
                </a>
                <a className={styles.secondaryAction} href="#details">
                  View Schedule
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="story">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Our Story</p>
            <h2>A love story unfolding in perfect time.</h2>
            <p>
              From a first hello to a forever promise, these are the moments that
              shaped Hugeoleen and Carl&apos;s next chapter.
            </p>
          </div>

          <div className={styles.storyGrid}>
            {storyMilestones.map((milestone) => (
              <article className={styles.storyCard} key={milestone.year}>
                <span className={styles.storyYear}>{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="details">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Event Details</p>
            <h2>Everything you need for the celebration.</h2>
            <p>
              Plan your arrival with ease and settle in for an evening of ocean
              views, warm company, and a joyful reception.
            </p>
          </div>

          <div className={styles.detailsGrid}>
            {eventDetails.map((detail) => (
              <article className={styles.detailPanel} key={detail.title}>
                <h3>{detail.title}</h3>
                <p>{detail.summary}</p>
                <ul className={styles.detailList}>
                  {detail.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="directions">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Event Direction</p>
            <h2>Pinpoint the venue and follow the easiest route in.</h2>
            <p>
              Villa Viento sits above the Tower Isle coastline in St. Mary. Use the
              live map below, then follow the step-by-step arrival guidance.
            </p>
          </div>

          <div className={styles.directionsLayout}>
            <div className={styles.mapShell}>
              <iframe
                className={styles.mapFrame}
                src={directions.mapEmbedUrl}
                title="Villa Viento map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className={styles.directionsCard}>
              <h3>How to find Villa Viento</h3>
              <ul className={styles.detailList}>
                {directions.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <div className={styles.directionMeta}>
                <div>
                  <span>Coordinates</span>
                  <strong>{directions.coordinates}</strong>
                </div>
                <div>
                  <span>Address area</span>
                  <strong>{directions.address}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="rsvp">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>RSVP</p>
            <h2>Let us know if we may save you a seat.</h2>
            <p>
              Share your response, guest count, dietary needs, and a note for the
              couple. Your submission is stored immediately for planning.
            </p>
          </div>

          <RSVPForm />
        </section>

        <section className={styles.section} id="registry">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Registry</p>
            <h2>Your presence is the greatest gift. If you wish, here are ways to give.</h2>
            <p>
              We&apos;ve included a simple registry link and direct bank transfer details
              for guests who prefer gifting that way.
            </p>
          </div>

          <div className={styles.registryGrid}>
            <article className={styles.registryCard}>
              <h3>Amazon Wishlist</h3>
              <p>
                Visit Amazon&apos;s registry portal and search for Hugeoleen & Carl to view
                the current wishlist.
              </p>
              <a
                className={styles.primaryAction}
                href={registryDetails.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Amazon Registry
              </a>
            </article>

            <article className={styles.registryCard}>
              <h3>Bank Transfer Details</h3>
              <dl className={styles.registryList}>
                {registryDetails.bankFields.map((field) => (
                  <div key={field.label} className={styles.registryRow}>
                    <dt>{field.label}</dt>
                    <dd>{field.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </section>

        <section className={styles.section} id="travel">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Travel & Accommodations</p>
            <h2>Travel recommendations for a smooth stay on the north coast.</h2>
            <p>
              Whether you are flying in for the day or staying for the weekend, these
              options keep you close to the celebration.
            </p>
          </div>

          <div className={styles.travelGrid}>
            <article className={styles.travelPanel}>
              <h3>Nearby Airports</h3>
              <ul className={styles.detailList}>
                {travelDetails.airports.map((airport) => (
                  <li key={airport}>{airport}</li>
                ))}
              </ul>
            </article>

            <article className={styles.travelPanel}>
              <h3>Parking & Arrival</h3>
              <ul className={styles.detailList}>
                {travelDetails.parking.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </article>

            <article className={styles.travelPanel}>
              <h3>Hotel Recommendations</h3>
              <div className={styles.hotelList}>
                {travelDetails.hotels.map((hotel) => (
                  <div className={styles.hotelCard} key={hotel.name}>
                    <strong>{hotel.name}</strong>
                    <span>{hotel.distance}</span>
                    <p>{hotel.note}</p>
                    <span className={styles.bookingCode}>{hotel.bookingCode}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>FAQ</p>
            <h2>Answers to common guest questions.</h2>
            <p>
              Expand each question for the details guests usually ask before the big
              day.
            </p>
          </div>

          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details className={styles.faqItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
