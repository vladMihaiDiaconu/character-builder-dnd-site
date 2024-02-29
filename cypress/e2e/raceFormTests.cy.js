import RaceForm from "../../src/components/character-creation-forms/RaceForm.astro";
import data from "../mock-data/races.json"

it('Race Form Component filter working', () => {
cy.mount(<RaceForm races={data}/>)

console.log(cy.get('select'));
})