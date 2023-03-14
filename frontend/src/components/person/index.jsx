import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useParams } from 'react-router-dom'
import { Blocks } from 'react-loader-spinner'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
  Button,
  Stack,
  Badge,
} from '@chakra-ui/react'

import personService from '../../services/person'
import { http } from '../../services/http'

const Person = () => {
  const queryClient = useQueryClient()
  const { id } = useParams()

  const { isLoading, data } = useQuery(['person', id], () =>
    personService.getPerson(id)
  )

  const updateMutation = useMutation({
    mutationFn: (dataObj) => http.put(`/api/persons/${id}`, dataObj),
    onSuccess: (data) => {
      alert(`${data?.data?.name} info updated!`)
      reset()
      queryClient.invalidateQueries({
        queryKey: ['persons', 'person'],
      })
    },
  })

  const regex = /^[0-9]{2,3}[-][0-9]{7,8}$/gm

  const schema = yup
    .object({
      name: yup.string().min(3).trim().required(),
      number: yup
        .string()
        .trim()
        .required()
        .matches(regex, 'Invalid phone number!'),
    })
    .required()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const isErrorName = errors.name?.message
  const isErrorNumber = errors.number?.message

  const onSubmit = (dataObj) => {
    updateMutation.mutate(dataObj)
  }

  if (isLoading || updateMutation.isLoading) {
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
    <>
      <TableContainer mt="3rem">
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Phone Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{data?.id}</Td>
              <Td>{data?.name}</Td>
              <Td>{data?.number}</Td>
              <Td></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Box mt="2rem">
        <form spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="1rem" isInvalid={isErrorName} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              size="lg"
              placeholder={data.name}
              {...register('name')}
            />
            {isErrorName && (
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorNumber} isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              size="lg"
              placeholder={data.number}
              {...register('number')}
            />
            {isErrorNumber && (
              <FormErrorMessage>{errors.number?.message}</FormErrorMessage>
            )}
          </FormControl>
          <Stack direction="column">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              pt={4}
            >
              <Button
                colorScheme="yellow"
                type="submit"
                size="lg"
                height="48px"
                width="100%"
                id="update-btn"
              >
                Update
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
      <Stack direction="row">
        <Badge variant="solid" colorScheme="green" my="7rem">
          Status: Approved
        </Badge>
      </Stack>
    </>
  )
}

export default Person
