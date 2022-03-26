import { objectInspect, timer } from "./utils";

const { Client } = require('@notionhq/client');

export const updateNotionToDos = async (courses: string[]) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const blockId = '122106bb44cc45e394a481713fbe0e86';
  const childrenToClean = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  
  for (const child of childrenToClean.results) {
    const response = await notion.blocks.delete({
      block_id: child.id,
    });
  }

  for (const course of courses) {
    const response = await notion.blocks.children.append({
      block_id: blockId,
      children: [
        {
          object: 'block',
          type: 'to_do',
          to_do: {
            rich_text: [
              {
                type: 'text',
                text: { content: course, link: null },
                annotations: {
                  bold: false,
                  italic: false,
                  strikethrough: false,
                  underline: false,
                  code: false,
                  color: 'default'
                }
              }
            ],
          }
        }
      ],
    });
  }
}

export const updateNotionRows = async (recettes: string[]) => {
  const rows = [
    {day: 'Lundi', id: 'e03b297a-e157-451c-a738-d83493851a0b'},
    {day: 'Mardi', id: '78c1f8ee-8971-4876-b14a-774c30798c7b'},
    {day: 'Mercredi', id: 'b24a97ba-8fa7-4d29-ad7d-aae067b3b480'},
    {day: 'Jeudi', id: '563cd6cb-7a0a-49c3-bc21-29a3831154d9'},
    {day: 'Vendredi', id: '6f77884f-fc05-4728-9f48-a4217c45b4d6'},
    {day: 'Samedi', id: '5d8b1f4a-a289-4e0c-a855-ca19247e8f5a'},
    {day: 'Dimanche', id: '53daa9a1-d7a7-4e06-8b1a-58d800fe47b8'},
  ]

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  let index = 0;
  for (const recette of recettes) {
    const day = rows[index].day;
    const blockId = rows[index].id;
    const response = await notion.blocks.update({
      block_id: blockId,
      table_row: {
        cells: [
          [
            {
              type: 'text',
              text: { content: day, link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default'
              },
              plain_text: day,
              href: null
            }
          ],
          [
            {
              type: 'text',
              text: { content: recette, link: null },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default'
              },
              plain_text: recette,
              href: null
            }
          ]
        ]
      }
    });
    index++;
  }
}

export const updateNotionDate = async (timestamp: Date) => {
  timestamp.setHours(timestamp.getHours()+1)
  const dateString = timestamp.toISOString().split('Z')[0]+'+01:00'
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const blockId = '07111f78f940480ebd5d452eff0dd719';
  const response = await notion.blocks.update({
    block_id: blockId,
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: { content: 'Dernier menu ', link: null },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default'
          },
          plain_text: 'Dernier menu ',
          href: null
        },
        {
          type: 'mention',
          mention: {
            type: 'date',
            date: {
              start: dateString,
              end: null,
              time_zone: null
            }
          }
        }
      ],
    }
  });
}