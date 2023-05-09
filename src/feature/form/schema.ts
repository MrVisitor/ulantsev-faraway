import { lazy, number, object, string } from 'yup'

export interface FormFields {
  name?: string;
  birth_year?: string;
  eye_color?: string;
  gender?: string;
  hair_color?: string;
  height?: number;
  mass?: number;
  skin_color?: string;
}

const schema = object<FormFields>().shape({
  name: string().required('Name is required'),
  height: lazy(value => (
    value === '' ? string() : number().typeError('Height must be a number')
  )),
  mass: lazy(value => (
    value === '' ? string() : number().typeError('Mass must be a number')
  )),
  birth_year: string(),
  eye_color: string(),
  gender: string(),
  hair_color: string(),
  skin_color: string(),
}).required()

export default schema