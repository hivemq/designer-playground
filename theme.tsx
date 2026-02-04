import { createSystem, defaultConfig, mergeConfigs } from '@chakra-ui/react'
import { config } from '@hivemq/ui-theme'
// import { buttonRecipe } from './recipes/button.recipe'

export const system = createSystem(
  defaultConfig,
  mergeConfigs(config, {
    theme: {
      //   recipes: {
      //     button: buttonRecipe,
      //   },
      semanticTokens: {
        colors: {
          border: {
            value: '{colors.shell.border}',
          },
          bg: {
            panel: {
              value: '{colors.shell.contrastBg}',
            },
          },
        },
      },
    },
  }),
)
