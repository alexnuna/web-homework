import React from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'
import { Spin, Empty, Modal } from 'antd'

// never have used GraphQL, MongoDB, or Apollo so doing this locally for making the most of the time I have on this project :)
// should also have made this a constant to be used in both the pie component and the home component
const fakeData = [{
  id: '1',
  user_id: 'user 1',
  amount: 729,
  credit: true,
  debit: false,
  description: '1',
  merchant_id: 'merchant 1'
}]

export const Home = () => {
  const [modalVisible, setModalVisible] = React.useState(false)
  // const [data, setData] = React.useState(fakeData)

  const { loading, error } = useQuery(GetTransactions)

  return (
    <div css={{ padding: 25 }}>
      <h3>Home Page</h3>
      <div css={{ paddingBottom: 10 }}>
        <button onClick={() => setModalVisible(true)}>Add Transaction</button>
        { /* for some reason the modal isn't popping up correctly. I was originally going to use the modal and use Yup and Formik to add
        validated values to the local state of the data. I am well over the recommended 2 hours and completed 3 other tasks so now just adding comments
        about what I would do with more time :) . I wanted to try to build this! */}
        <Modal title='Add a Transaction Below'
          visible={modalVisible}
          // would add additional lines to onOk something like: && setData([...data, {id: validatedValues.id, etc]})
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
          width={1000}
        >
          <p>Input id</p>
          <p>Input ID</p>
          <p>input rest of content...</p>
        </Modal>
      </div>
      <div>{loading ? (
        <Spin />
      ) : error ? (
        <Empty />
      ) : (
            // would update table with the data value above to get the newest local state
            <TxTable data={fakeData} />
          )}
      </div>
    </div >
  )
}
