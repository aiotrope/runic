import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react'
import { Blocks } from 'react-loader-spinner'
import personService from '../../services/person'
import { http } from '../../services/http'

const List = () => {
  const queryClient = useQueryClient()
  const fetchPersons = useQuery({
    queryKey: ['persons'],
    queryFn: personService.getPersons,
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => http.delete(`/api/persons/${id}`),
    onSuccess: (data) => {
      alert(data?.data?.details)
      queryClient.invalidateQueries({
        queryKey: ['persons', 'person'],
      })
    },
    onError: (error) => alert(error?.response?.data?.error),
  })

  if (fetchPersons.isLoading) {
    return (
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper spinner"
      />
    )
  }

  return (
    <TableContainer mt="2rem">
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {fetchPersons?.data?.map(({ id, name, number }) => (
            <Tr key={id}>
              <Td>
                <Link to={`/person/${id}`} id="name-link">
                  {name}
                </Link>
              </Td>
              <Td>{number}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="xs"
                  onClick={() => deleteMutation.mutate(id)}
                  id="delete-btn"
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Phone Number</Th>
            <Th>Action</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default List
