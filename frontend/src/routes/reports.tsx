import { createFileRoute } from '@tanstack/react-router';
import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Typography,
  message,
} from 'antd';

import axios from 'axios';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export const Route = createFileRoute('/reports')({
  component: RouteComponent,
});

type ReportType =
  | 'waybill'
  | 'losses'
  | 'losses-by-driver'
  | 'profit';

const reportOptions = [
  {
    label: 'Путевые листы',
    value: 'waybill',
  },
  {
    label: 'Убытки компании',
    value: 'losses',
  },
  {
    label: 'Убытки по водителям',
    value: 'losses-by-driver',
  },
  {
    label: 'Прибыль компании',
    value: 'profit',
  },
];

function RouteComponent() { //eslint-disable-line
  const [loading, setLoading] = useState(false);

  const [reportType, setReportType] =
    useState<ReportType>('waybill');

  const [dates, setDates] = useState<any[]>([]); //eslint-disable-line

  const [clientId, setClientId] = useState('');

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const columns = useMemo(() => {
    switch (reportType) {
      case 'waybill':
        return [
          {
            title: 'ID',
            dataIndex: 'id',
          },
          {
            title: 'TTN',
            dataIndex: 'ttn',
          },
          {
            title: 'Отправитель',
            dataIndex: 'sender',
          },
          {
            title: 'Получатель',
            dataIndex: 'receiver',
          },
          {
            title: 'Машина',
            dataIndex: 'car',
          },
          {
            title: 'Водитель',
            dataIndex: 'driver',
          },
          {
            title: 'Дата',
            dataIndex: 'date',
          },
        ];

      case 'losses':
        return [
          {
            title: 'Дата',
            dataIndex: 'date',
          },
          {
            title: 'TTN',
            dataIndex: 'ttn',
          },
          {
            title: 'Продукт',
            dataIndex: 'product',
          },
          {
            title: 'Количество',
            dataIndex: 'quantity',
          },
          {
            title: 'Цена',
            dataIndex: 'price',
          },
          {
            title: 'Убыток',
            dataIndex: 'total',
          },
          {
            title: 'Ответственный',
            dataIndex: 'responsible',
          },
        ];

      case 'losses-by-driver':
        return [
          {
            title: 'Водитель',
            dataIndex: 'driver',
          },
          {
            title: 'Сумма убытков',
            dataIndex: 'totalAmount',
          },
        ];

      case 'profit':
        return [
          {
            title: 'Период',
            dataIndex: 'period',
          },
          {
            title: 'Доход',
            dataIndex: 'revenue',
          },
          {
            title: 'Расходы',
            dataIndex: 'expenses',
          },
          {
            title: 'Прибыль',
            dataIndex: 'profit',
          },
        ];

      default:
        return [];
    }
  }, [reportType]);

  const handleDownload = async () => {
    try {
      if (!dates.length) {
        return message.error('Выберите диапазон дат');
      }

      setLoading(true);

      const startDate = dayjs(dates[0]).format('YYYY-MM-DD');

      const endDate = dayjs(dates[1]).format('YYYY-MM-DD');

      const response = await axios.get(
        `http://localhost:3000/report/${reportType}`,
        {
          params: {
            startDate,
            endDate,
            clientId,
            page,
            limit,
          },

          responseType: 'blob',
        },
      );

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = `${reportType}-report.xlsx`;
      document.body.appendChild(link);

      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      message.success('Отчет успешно скачан');
    } catch (error) {
      console.error(error);

      message.error('Ошибка скачивания отчета');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        padding: 16,
        background: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      <Card
        style={{
          width: '100%',
          height: '100%',
        }}
        bodyStyle={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Flex
          vertical
          gap={24}
          style={{
            height: '100%',
          }}
        >
          <Title level={3}>XLSX Отчеты</Title>

          <Form layout="vertical">
            <Space
              direction="vertical"
              size={16}
              style={{ width: '100%' }}
            >
              <Form.Item label="Тип отчета">
                <Select
                  value={reportType}
                  options={reportOptions}
                  onChange={(value) =>
                    setReportType(value)
                  }
                />
              </Form.Item>

              <Form.Item label="Диапазон дат">
                <RangePicker
                  style={{ width: '100%' }}
                  onChange={(value) =>
                    setDates(value || [])
                  }
                />
              </Form.Item>

              <Form.Item label="Client ID">
                <Input
                  placeholder="Введите clientId"
                  value={clientId}
                  onChange={(e) =>
                    setClientId(e.target.value)
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                loading={loading}
                onClick={handleDownload}
              >
                Скачать XLSX
              </Button>
            </Space>
          </Form>

          <div
            style={{
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Table
              bordered
              columns={columns}
              dataSource={[]}
              pagination={false}
              rowKey="id"
              scroll={{ y: '100%' }}
              style={{ height: '100%' }}
            />
          </div>

          <Pagination
            current={page}
            pageSize={limit}
            total={100}
            onChange={(newPage, newLimit) => {
              setPage(newPage);
              setLimit(newLimit);
            }}
          />
        </Flex>
      </Card>
    </div>
  )}