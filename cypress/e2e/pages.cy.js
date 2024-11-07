import {moveTo, ascendingSortCheck, fillFilter, filteredSearch, getAllEntriesCount, getPageEntriesCount, setPageEntriesCount} from '../support/commands';

describe('pages spec', () => {
    beforeEach(() => {
        cy.visit('https://pdocrud.com/demo/pages/table-col-more-formatting')})

    it('set entries count on page', () => {
        getPageEntriesCount('startCount')
        getAllEntriesCount('allExpected')

        setPageEntriesCount('10')
        getPageEntriesCount('count10')
        setPageEntriesCount('50')
        getPageEntriesCount('count50')
        setPageEntriesCount('100')
        getPageEntriesCount('count100')
        setPageEntriesCount('All')
        getPageEntriesCount('countAll')
        cy.get('@startCount').should('equal', '10')
        cy.get('@count10').should('equal', '10')
        cy.get('@count50').should('equal', '50')
        cy.get('@count100').should('equal', '100')
        cy.get('@countAll').then((countAll) => {
            cy.get('@allExpected').should('equal', countAll)
        });
    })

    it('move to page', () => {
        moveTo('3', '30')
        moveTo('13', '130')
        moveTo('1', '10')
    })

    it('move to page with filter', () => {
        fillFilter('Classic Cars')
        filteredSearch()
        moveTo('3', '30')

        cy.get('table').find('.pdocrud-row-cols div').each(($cell) => {
            cy.wrap($cell).should('have.attr', 'data-attribute', 'abc-Classic Cars');
        })

        cy.get('[id=pdocrud_search_box]').contains('Classic Cars')
    })

    it('move to page with sorting', () => {
        cy.get('[data-action="sort"]').first().click()

        cy.get('.pdocrud-img-ajax-loader').should('not.be.visible')
        moveTo('3', '30')

        ascendingSortCheck()
    })
})
