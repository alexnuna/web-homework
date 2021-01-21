import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { Radio } from 'antd'

const styles = css`
 .header {
   font-weight: bold;
 },
 table {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
 td, th {
   border-top: 1px solid black;
   border-left: 1px solid black;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export const TxTable = ({ data }) => {
  const [isRomanNumeral, setIsRomanNumeral] = React.useState(false)
  const getRomanNumeral = (value) => {
    // drawback with this method is it really on works up to 4000
    const romans = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
      8: 'VIII',
      9: 'IX',
      10: 'X',
      20: 'XX',
      30: 'XXX',
      40: 'XL',
      50: 'L',
      60: 'LX',
      70: 'LXX',
      80: 'LXXX',
      90: 'XC',
      100: 'C',
      200: 'CC',
      300: 'CCC',
      400: 'CD',
      500: 'D',
      600: 'DC',
      700: 'DCC',
      800: 'DCCC',
      900: 'CM',
      1000: 'M',
      2000: 'MM',
      3000: 'MMM'
    }
    const romanNumeral = value.toString().split('').reverse().map((v, i) => v * Math.pow(10, i)).map(v => romans[v]).reverse().join('')
    return isRomanNumeral ? romanNumeral : `$${value}`
  }
  return (
    <div>
      <table css={styles} >
        <tbody>
          <tr className='header'>
            <td >ID</td>
            <td >User ID</td>
            <td >Description</td>
            <td >Merchant ID</td>
            <td >Debit</td>
            <td >Credit</td>
            <td >
              <Radio.Group
                defaultValue='a'
                onChange={() =>
                  isRomanNumeral ? setIsRomanNumeral(false) : setIsRomanNumeral(true)
                }
              >
                <Radio.Button value='a'>
                  Standard Dollar Amount
              </Radio.Button>
                <Radio.Button value='b'>
                  Roman Numeral Amount
              </Radio.Button>
              </Radio.Group></td>
          </tr>
          {
            data.map(tx => {
              const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
              return (
                <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                  <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                  <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                  <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                  <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                  <td data-testid={makeDataTestId(id, 'debit')}>{debit ? 'Yes' : 'No'}</td>
                  <td data-testid={makeDataTestId(id, 'credit')}>{credit ? 'Yes' : 'No'}</td>
                  <td data-testid={makeDataTestId(id, 'amount')}>{getRomanNumeral(amount)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}
