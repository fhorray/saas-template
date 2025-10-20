import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();


// Fields
const InputField = lazy(() => import('@/components/form/input'));


export const { useAppForm: useForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
  },
  formComponents: {
  },
});