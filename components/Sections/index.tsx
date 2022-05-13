import React, { useContext } from 'react';

import Card from '../../components/Card';

import { PageContext } from '../../context';

interface Props {
  sections: Array<string>,
  handleRemoveSection: any,
  setAdding: any,
}

const Sections = ({ sections, handleRemoveSection, setAdding }: Props) => {
  const { state: { contextHeaders = [], contextItems = [] }}  = useContext(PageContext);

  return (
    <>
      {sections && sections.map((section: string) => {
            const headKey = contextHeaders ? contextHeaders[parseInt(section)-1] : '';

            return (
              <Card
                key={`section-${section}`}
                id={section}
                onSectionAdded={() => setAdding(false)}
                removeSection={handleRemoveSection}
                head={headKey}
                items={contextItems[headKey]}
              />
            )
          })}
    </>
  )
}

export default Sections;
