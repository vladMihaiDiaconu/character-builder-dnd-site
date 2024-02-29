import BannerWithAccordion from "../../src/components/banners/BannerWithAccordion.astro"

it('Banner With Accordion Component progress buttons working', () => {
cy.mount(<BannerWithAccordion />)

console.log(cy.get('button'));
})