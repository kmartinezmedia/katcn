import { data } from '#docgen/data';
import { DocgenSource, DocgenSourceList } from '#docgen/types';

import Link from 'next/link';

type NavigationListProps = React.PropsWithChildren;

type NavigationItemProps = DocgenSource;

interface NavifationProps extends React.PropsWithChildren {
  data: DocgenSourceList;
  renderItem: (props: NavigationItemProps) => React.ReactNode;
  renderList: (props: NavigationListProps) => React.ReactNode;
}

function Navigation({
  data,
  renderList: List,
  renderItem: Item,
}: NavifationProps) {
  return (
    <List>
      {data.sources.map((item) => (
        <Item key={item.slug} {...item} />
      ))}
    </List>
  );
}

export async function Sidebar() {
  return (
    <section>
      <h2>Components</h2>
      <Navigation
        data={data}
        renderList={({ children }) => {
          return <div>{children}</div>;
        }}
        renderItem={({ name, slug }) => {
          return (
            <Link className="flex flex-row" href={`/components/${slug}`}>
              {name}
            </Link>
          );
        }}
      />
    </section>
  );
}
