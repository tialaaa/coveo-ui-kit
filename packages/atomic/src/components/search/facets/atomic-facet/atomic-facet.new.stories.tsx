import {parameters} from '@coveo/atomic/storybookUtils/common-meta-parameters';
import {facetDecorator} from '@coveo/atomic/storybookUtils/facets-decorator';
import {renderComponent} from '@coveo/atomic/storybookUtils/render-component';
import {wrapInSearchInterface} from '@coveo/atomic/storybookUtils/search-interface-wrapper';
import type {Meta, StoryObj as Story} from '@storybook/web-components';

const {decorator, play} = wrapInSearchInterface();

const meta: Meta = {
  component: 'atomic-facet',
  title: 'Atomic/Facet',
  id: 'atomic-facet',

  render: renderComponent,
  decorators: [decorator],
  parameters,
  play,
};

export default meta;

export const Default: Story = {
  name: 'atomic-facet',
  args: {
    'attributes-field': 'objecttype',
  },
  decorators: [facetDecorator],
};
