import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    'gender',
    'plurals',
    'adjectives',
    'pronouns',
    'quick-reference',
    {
      type: 'category',
      label: 'Exercises',
      link: {
        type: 'doc',
        id: 'exercises/index',
      },
      items: [
        'exercises/gender-id',
        'exercises/plurals',
        'exercises/interactive',
      ],
    },
    {
      type: 'category',
      label: 'Cheatsheets',
      link: {
        type: 'doc',
        id: 'cheatsheets/index',
      },
      items: [
        'cheatsheets/gender',
        'cheatsheets/plurals',
        'cheatsheets/adjectives',
      ],
    },
  ],
};

export default sidebars;
