import { bootStrap3 } from './bootstrap3/bootstrap3';
// TODO blockIds and componentIds lists in order to have an easy array to do a find on? when filtering for active modules?

export const constants = {

    blocks: {

        gridsystem: { 
            container: {id: 'container_block'},
            row: { id: 'row_block'},
            column: { id: 'column_block' },
        },

        typography: {
            heading: { id: 'heading_block'},
            paragraph: { id: 'paragraph_block'},
            abbreviation: { id: 'abbvreviation_block' },
            address: { id: 'address_block' },
            blockquote: { id: 'blockquote_block' },
        },

    },

    components: {

        gridsystem: { 
            container: {id: 'container_component'},
            row: { id: 'row_component'},
            column: { id: 'column_component' },
        },
        
        typography: {

            heading: { 
                id: 'heading_component',
                tags: bootStrap3.typography.headings.tags,
            },

            paragraph: { 
                id: 'paragraph_component',
                tags: ['P'],
                classes: [
                    ...bootStrap3.typography.bodycopy.classes,
                    ...bootStrap3.typography.alignment.classes,
                    ...bootStrap3.typography.trasnformation.classes,
                ],
            },

            abbreviation: {
                id: 'abbreviation_component',
                tags: 'ABBR',
                classes: ['initialism'],
                attributes: ['title'],
            },

            address: {
                id: 'address_component',
                tags: 'address',
            },

            blockquote: {
                id: 'blockquote_component', 
                tags: 'BLOCKQUOTE',
                classes: bootStrap3.typography.blockquotes.classes,
            }

        },
    },

}
