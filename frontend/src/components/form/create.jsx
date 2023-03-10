import * as React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Blocks } from 'react-loader-spinner'

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
  Button,
  Stack,
} from '@chakra-ui/react'

import personService from '../../services/person'

const regex = /^[0-9]{2,3}[-][0-9]{7,8}$/gm
const schema = yup
  .object({
    name: yup.string().trim().min(3).required(),
    number: yup
      .string()
      .trim()
      .required()
      .matches(regex, 'Invalid phone number!'),
  })
  .required()

const CreateForm = () => {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const createMutation = useMutation({
    mutationFn: personService.createPerson,
    onSuccess: (data) => {
      alert(`${data?.name} added!`)
      reset()
      queryClient.invalidateQueries({
        queryKey: ['persons', 'person'],
      })
    },
  })

  const isErrorName = errors.name?.message
  const isErrorNumber = errors.number?.message

  const onSubmit = async (data) => {
    try {
      await createMutation.mutateAsync(data)
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  if (createMutation.isLoading) {
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
    <Box mt="3rem">
      <form spellCheck="false" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="1rem" isInvalid={isErrorName} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            size="lg"
            placeholder="Minimum of 3 characters."
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
            placeholder="e.g. 23-1234567 / 000-12345678 / 56-1234567 / 454-1234567"
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
              colorScheme="facebook"
              type="submit"
              size="lg"
              height="48px"
              width="100%"
              id="create-btn"
            >
              Add
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  )
}

export default CreateForm
