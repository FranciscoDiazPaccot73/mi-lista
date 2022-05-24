import React from 'react';

import { IconButton, Input, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {
  className: string,
  formatedLinks: any,
  handleFilter: any,
  filterValue?: string,
}

const Filter = ({ className, formatedLinks, handleFilter, filterValue }: Props) => (
  <div className={className}>
    <InputGroup>
      <InputLeftElement>
        <SearchIcon color={!formatedLinks || !formatedLinks.length ? "gray.400" : ''} />
      </InputLeftElement>
      <Input
        isDisabled={!formatedLinks || !formatedLinks.length}
        placeholder='Filtrar por nombre o url'
        onChange={e => handleFilter(e.target.value)}
        value={filterValue}
      />
      {filterValue && filterValue !== '' && (
        <InputRightElement>
          <IconButton
            variant="ghost"
            isRound
            size="xs"
            aria-label="Clean filter"
            icon={<CloseIcon />}
            colorScheme={!formatedLinks || !formatedLinks.length ? "gray.400" : ''}
            onClick={(_: any) => handleFilter(_, true)}
          />
        </InputRightElement>
      )}
    </InputGroup>
  </div>
)

export default Filter;
