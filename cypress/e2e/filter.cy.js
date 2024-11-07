import {fillFilter, filteredSearch, clearFilter, getAllEntriesCount} from '../support/commands';

describe('filter spec', () => {
    beforeEach(() => {
        cy.visit('https://pdocrud.com/demo/pages/table-col-more-formatting')})

    it('positive valid search with filter', () => {
        fillFilter('Classic Cars')
        filteredSearch()
        cy.get('table').find('.pdocrud-row-cols div').each(($cell) => {
        cy.wrap($cell).should('have.attr', 'data-attribute', 'abc-Classic Cars');
        })
    })

    it('negative valid search with filter', () => {
        fillFilter('lllll')
        filteredSearch()
        cy.get('tr.pdocrud-data-row').children().should('have.class', 'pdocrud-row-count');
    })

    it('search using a filter containing special characters', () => {
        fillFilter('&<>«»')
        filteredSearch()
        cy.get('tr.pdocrud-data-row').children().should('have.class', 'pdocrud-row-count');
    })

    it('search using a filter containing letters of the Russian alphabet', () => {
        fillFilter('буквы')
        filteredSearch()
        cy.get('tr.pdocrud-data-row').children().should('have.class', 'pdocrud-row-count');
    })

    it('reset filter', () => {
        getAllEntriesCount('allEntries')

        fillFilter('Classic Cars')
        filteredSearch()

        clearFilter()
        filteredSearch()
        getAllEntriesCount('resultEntries')

        cy.get('@allEntries').then((firstValue) => {
            cy.get('@resultEntries').then((secondValue) => {
                expect(firstValue).to.equal(secondValue);
            });
        });
    })
})