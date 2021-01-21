import * as React from 'react'

import { ResponsivePie } from '@nivo/pie'
import { Radio } from 'antd'
import { groupBy } from 'lodash'

// should also have made this a constant to be used in both the pie component and the home component
const fakeData = [{
  id: '1',
  user_id: 'user 1',
  amount: 729,
  credit: true,
  debit: false,
  description: '1',
  merchant_id: 'merchant 1'
},
{
  id: '2',
  user_id: 'user 2',
  amount: 50,
  credit: true,
  debit: false,
  description: '2',
  merchant_id: 'merchant 2'
},
{
  id: '4',
  user_id: 'user 2',
  amount: 222,
  credit: true,
  debit: false,
  description: '3',
  merchant_id: 'merchant 2'
}]

const getPieChart = (colors, data) => {
  const total = data.reduce((acc, a) => acc + a.value, 0)
  return (
    <ResponsivePie
      colors={colors}
      data={data}
      innerRadius={0.5}
      legends={[
        {
          anchor: 'right',
          direction: 'column',
          translateY: 40,
          translateX: 120,
          itemWidth: 170,
          itemHeight: 40,
          symbolSize: 35,
          symbolShape: 'circle'
        }
      ]}
      margin={{ top: 0, right: 150, bottom: 0, left: 0 }}
      radialLabel=''
      radialLabelsLinkStrokeWidth={0}
      sliceLabel={item => `${Math.round((item.value / total) * 100)}%`}
      slicesLabelsTextColor={'#FFFFFF'}
      theme={{
        labels: {
          text: {
            fontSize: 14
          }
        }
      }}
    />
  )
}

export const Pie = () => {
  // const { loading, error } = useQuery(GetTransactions)
  const [viewUserChart, setViewUserChart] = React.useState(false)
  const getPieData = (data, slicer) => {
    const dataBySlicer = groupBy(data, slicer)
    return (Object.keys(dataBySlicer)?.map(object => (
      {
        id: object,
        label: object,
        value: dataBySlicer[object].reduce((acc, a) => acc + a.amount, 0)
      }
    )))
  }

  // doing the logic here by Merchant and User since they are part of the basic schema rather then by category or spend per day for the sake of time
  return (
    <div css={{ padding: 20 }}>
      <h3>{viewUserChart ? 'Spend by Merchant' : 'Spend by User'}</h3>
      <div css={{ paddingBottom: 10 }}>Select the value below to display the summary data broken down by category</div>
      <Radio.Group
        defaultValue='a'
        onChange={() =>
          viewUserChart ? setViewUserChart(false) : setViewUserChart(true)
        }
      >
        <Radio.Button value='a'>
          User Chart
        </Radio.Button>
        <Radio.Button value='b'>
          Merchant Chart
        </Radio.Button>
      </Radio.Group>
      <div css={{ height: 400 }}>
        {/* need to add some type of loading response in the future for when this is fetched  */}
        {viewUserChart ? getPieChart(['#6EDBFF', '#9BD7C8'], getPieData(fakeData, 'merchant_id')) : getPieChart(['#9BD7C8', '#6EDBFF'], getPieData(fakeData, 'user_id'))}
      </div >
    </div>
  )
}
