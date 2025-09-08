import { FormFieldResolverOptions } from '@primevue/forms'

import { i18n } from '#i18n'

export const requiredResolver = ({ value, name = '' }: FormFieldResolverOptions) => {
  const errors = []
  if (value === '') {
    errors.push({
      message: i18n.t('validation.isRequired', [name]),
    })
  }
  return { errors }
}
