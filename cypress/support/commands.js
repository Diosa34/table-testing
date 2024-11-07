export const filteredSearch = () => {
    cy.get('#pdocrud_search_btn').click();
    cy.get('.pdocrud-img-ajax-loader').should('not.be.visible')
}

export const fillFilter = (term) => {
    cy.get('[id=pdocrud_search_box]').type(term);
}

export const clearFilter = () => {
    cy.get('[id=pdocrud_search_box]').clear();
}

export const getAllEntriesCount = (alias) => {
    cy.get('div.row div p').invoke('text').then((text) => {
        cy.wrap(text.split(' ')[5]).as(alias)
    })
}

export const getPageEntriesCount = (alias) => {
    cy.get('.pdocrud-img-ajax-loader').should('not.be.visible')
    cy.get('div.row div p').invoke('text').then((text) => {
        cy.wrap(text.split(' ')[3]).as(alias)
    })
}

export const setPageEntriesCount = (selectorValue) => {
    cy.get('[data-action="records_per_page"]').select(selectorValue).as(selectorValue)
}

export const ascendingSortCheck = () => {
    cy.get('.pdocrud-img-ajax-loader').should('not.be.visible')
    cy.get('.pdocrud-table').then((table) => {
        const values = [];

        cy.wrap(table).find('.pdocrud-row-cols div').each(($el) => {
            values.push($el.text().trim())
        })

        cy.wrap(values).then((filledValues) => {
            const sortedValues = [...filledValues].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
            expect(filledValues).to.deep.equal(sortedValues);
        })
    })
}

export const descendingSortCheck = () => {
    cy.get('.pdocrud-img-ajax-loader').should('not.be.visible')
    cy.get('.pdocrud-table').then((table) => {
        const values = [];

        cy.wrap(table).find('.pdocrud-row-cols div').each(($el) => {
            values.push($el.text().trim())
        })

        cy.wrap(values).then((filledValues) => {
            const sortedValues = [...filledValues].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).reverse();
            expect(filledValues).to.deep.equal(sortedValues);
        })
    })
}

export const moveTo = (pageCount, lastPageValue) => {
    cy.get(`[data-page=${pageCount}]`).as(pageCount + 'Page').click()
    getPageEntriesCount('count' + pageCount)
    cy.get('@count' + pageCount).should('equal', lastPageValue)
    cy.get('@' + pageCount + 'Page').parent().should('have.class', 'active')
}