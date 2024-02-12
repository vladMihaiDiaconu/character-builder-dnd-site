import BannerWithAccordion from "./banners/BannerWithAccordion.astro";
import CardsAndTextBanner from "./banners/CardsAndTextBanner.astro";
import DisplayCard from "./cards/DisplayCard.astro";
import HeroBanner from "./banners/HeroBanner.astro";
import Stripe from "./misc/Stripe.astro";

export default [
    {
        name:'banners.banner-with-accordion',
        component: BannerWithAccordion
    },
    {
        name:'banners.cards-and-text-banner',
        component: CardsAndTextBanner
    },
    {
        name:'banners.hero-banner',
        component: HeroBanner
    },
    {
        name:'misc.stripe',
        component: Stripe
    },
    {
        name:'cards.display-card',
        component: DisplayCard
    },
]