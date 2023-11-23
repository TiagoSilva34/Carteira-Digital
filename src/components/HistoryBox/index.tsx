import { 
  Container, 
  ContainerBox,
  Header,
  LegendContainer,
  Legend 
} from './styles';

import { formatCurrency } from '../../utils/formatCurrency';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

export const HistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColorAmountEntry,
  lineColorAmountOutput,
}) => (
  <Container>
    <Header>
      <h2>Histórico de saldo</h2>
      <LegendContainer>
        <Legend
          color={lineColorAmountEntry}
        >
          <div></div>
          <span>Entradas</span>
        </Legend>
        <Legend
          color={lineColorAmountOutput}
        >
          <div></div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </Header>

    <ContainerBox>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ left: 20, right: 20, top: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#cecece' />
          <XAxis dataKey='month' stroke='#cecece' />
          <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
          <Line
            type='monotone'
            dataKey='amountEntry'
            name='Entradas'
            stroke={lineColorAmountEntry}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey='amountOutput'
            name='Saída'
            stroke={lineColorAmountOutput}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ContainerBox>
  </Container>
);
