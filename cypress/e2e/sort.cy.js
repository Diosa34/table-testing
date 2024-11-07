import {fillFilter, filteredSearch, descendingSortCheck, setPageEntriesCount, ascendingSortCheck} from '../support/commands';

describe('sorting spec', () => {
    beforeEach(() => {
        cy.visit('https://pdocrud.com/demo/pages/table-col-more-formatting')
        setPageEntriesCount('50')
        cy.get('[data-action="records_per_page"]').should('have.value', '50')
    })

    it('sorting by the first column in ascending order by first ', () => {
        cy.get('[data-action="sort"]').first().click()
        ascendingSortCheck()
    })

    it('sorting by the first column in descending order', () => {
        descendingSortCheck()
    })

    it('positive sort with filter in ascending order', () => {
        fillFilter('This model features')
        filteredSearch()

        cy.get('[data-action="sort"]').first().click()
        ascendingSortCheck()
    })

    it('negative sort with filter in ascending order', () => {
        fillFilter('Classic Cars')
        filteredSearch()

        cy.get('[data-action="sort"]').first().click()
        ascendingSortCheck()
    })
})
