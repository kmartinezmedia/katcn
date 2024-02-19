import { notFound } from 'next/navigation';
import { data } from '#docgen/data';
import { type DocgenPropertyValue } from '#docgen/types';

type Props = { params: { slug: string } };

function handlePropType(prop: DocgenPropertyValue) {
  switch (prop.type) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'array':
    case 'object':
      return <p>array</p>;
    case 'union':
      return prop.value.map((item) => {
        return <p>{item}</p>;
      });
  }
}

export default async function Page({ params }: Props) {
  const component = data.get(params.slug);

  if (component === undefined) {
    return notFound();
  }

  return (
    <ul>
      {component.properties.map((prop) => (
        <li key={prop.name}>
          <h4>{prop.name}</h4>
          <p>{prop.description}</p>
          {handlePropType(prop.value)}
        </li>
      ))}
    </ul>
  );
}
