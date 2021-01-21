import * as React from 'react'

import { ResponsivePie } from '@nivo/pie'
import { Radio } from 'antd'

const fakeData = [{
  id: '1',
  user_id: 'user 1',
  amount: 50,
  credit: true,
  debit: false,
  description: '1',
  merchant_id: 'merchant 1',
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
  const getPieData = (slicer) => fakeData.map(object =>
    ({
      id: object[slicer],
      label: object[slicer],
      value: object.amount
    })
  )
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
        {viewUserChart ? getPieChart(['#6EDBFF'], getPieData('merchant_id')) : getPieChart(['#9BD7C8'], getPieData('user_id'))}
      </div >
    </div>
  )
}
