import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Button } from './button'

export default {
  title: "Button",
  component: Button,
  argTypes: {
    theme: {
      options: [
        "default", 
        "disabled", 
        "warning", 
        "danger", 
        "success"
      ],
      control: {
        type: 'select'
      }
    }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />  

export const Default = Template.bind({})
Default.args = {
  theme: "default",
  children: "Button default"
}

export const Disabled = Template.bind({})
Disabled.args = {
  theme: "disabled",
  children: "Button disabled"
}

export const Warning = Template.bind({})
Warning.args = {
  theme: "warning",
  children: "Button warning"
}

export const Danger = Template.bind({})
Danger.args = {
  theme: "danger",
  children: "Button danger"
}

export const Success = Template.bind({})
Success.args = {
  theme: "success",
  children: "Button success"
}


/* export const Default = () => <Button theme="default" />

export const Disabled = () => <Button theme="disabled" />

export const Warning = () => <Button theme="warning" />

export const Danger = () => <Button theme="danger" />

export const Success = () => <Button theme="success" />
 */

