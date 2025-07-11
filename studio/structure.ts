import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Tags')
        .child(
          S.list()
            .title('Tags')
            .items([
              S.documentTypeListItem('attribute').title('Attributes'),
              S.documentTypeListItem('distance').title('Distances'),
            ]),
        ),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([S.documentTypeListItem('campground').title('Campgrounds')]),
        ),
    ])
