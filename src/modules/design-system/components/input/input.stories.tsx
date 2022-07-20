import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Input } from './input'

export default {
  title: "Input",
  component: Input,
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
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />  

export const Default = Template.bind({})
Default.args = {
  theme: "default",
  type: "text",
  placeholder: "input default"
}

export const Disabled = Template.bind({})
Disabled.args = {
  theme: "disabled",
  type: "text",
  children: "input disabled"
}
