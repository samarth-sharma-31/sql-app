import { debounce } from 'lodash'
import React from 'react'
import { faker } from '@faker-js/faker';
import { EMPLOYEES_DATA } from '../mocks'
import { copyContentToClipboard } from '../utils'

enum SupportedQueries {
  Customers = 'select * from customers;',
  Employees = 'select * from employees;'
}

const SUPPORTED_QUERIES_VS_DATA_GETTER = {
  [SupportedQueries.Customers]: () => {
    return new Array(5000).fill(null).map((value, id) => {
      const firstName = faker.person.firstName()
      return ({
        id: id,
        firstName: firstName,
        lastName: faker.person.lastName(),
        contact: faker.phone.imei(),
        zodiacSign: faker.person.zodiacSign(),
      })
    })
  },
  [SupportedQueries.Employees]: () => {
    return EMPLOYEES_DATA
  },
}


export interface SqlQueryExecutionContextInterface {
  isQueryExecuting: boolean
  handleQueryUpdate: (updatedQuery: string) => void
  data: any
  handleQueryExecute: () => void
  handleQueryCopy: (onSuccessCallback: () => void) => void
  query: string | undefined
  queryExecutionError: boolean
}

export const SqlQueryExecutionContext = React.createContext<SqlQueryExecutionContextInterface>({
  isQueryExecuting: false,
  handleQueryUpdate: () => void 0,
  data: undefined,
  handleQueryExecute: () => void 0,
  handleQueryCopy: () => void 0,
  query: '',
  queryExecutionError: false
})

export function SqlQueryExecutionContextProvider(props: React.PropsWithChildren<unknown>): React.ReactElement {
  const [isQueryExecuting, setIsQueryExecuting] = React.useState<boolean>(false)
  const [queryExecutionError, setQueryExecutionError] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string | undefined>(SupportedQueries.Customers)

  const [data, setData] = React.useState<any>()

  const handleQueryExecute = React.useCallback(() => {
    setIsQueryExecuting(true)
    setData([])
    setQueryExecutionError(false)

    // use query to set data
    // set timeout with a 2sec delay has been used to stimulate async query execution and loading state
    setTimeout(() => {
      // set some mock data
      const queryGetterFn = SUPPORTED_QUERIES_VS_DATA_GETTER[query?.toLowerCase().trim() as SupportedQueries]
      if (queryGetterFn) {
        setData(queryGetterFn())
      } else {
        setQueryExecutionError(true)
      }
      setIsQueryExecuting(false)
    }, 2000)

  }, [query])

  const handleQueryUpdate = React.useCallback(debounce((updatedQuery: string) => {
    setQuery(updatedQuery)
  }, 200), [])

  const handleQueryCopy = React.useCallback((onSuccessCallback: () => void) => {
    if (query) {
      copyContentToClipboard(query).then(() => {
        onSuccessCallback()
      })
    }
  }, [query])

  return (
    <SqlQueryExecutionContext.Provider value={{ isQueryExecuting, data, handleQueryExecute, handleQueryUpdate, handleQueryCopy, query, queryExecutionError }}>
      {props.children}
    </SqlQueryExecutionContext.Provider>
  )
}

export function useSqlQueryExecutionContext(): SqlQueryExecutionContextInterface {
  return React.useContext(SqlQueryExecutionContext)
}
