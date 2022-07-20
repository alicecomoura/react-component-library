import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { SearchInputButton } from './search-input-button'

export default {
  title: "Search Input Button",
  component: SearchInputButton,
  argTypes: {
    theme: {
      options: [
        "default", 
        "disabled", 
      ],
      control: {
        type: 'select'
      }
    },
    type: {
      options: [
        "text",
        "password",
        "email"
      ],
      control: {
        type: 'select'
      }
    }
  }
} as ComponentMeta<typeof SearchInputButton>

const Template: ComponentStory<typeof SearchInputButton> = (args) => <SearchInputButton {...args} />  

export const Default = Template.bind({})
Default.args = {
  theme: "default",
  type: "text",
  placeholder: "search input button default"
}

export const Disabled = Template.bind({})
Disabled.args = {
  theme: "disabled",
  type: "text",
  children: "search input button disabled"
}
