import { useState, useEffect } from 'react';
import { Button, Tooltip, Space, message, Card } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Master from './Master';
import { mockMaster } from './mockTables';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Card
      style={{ width: '100%', marginTop: 16 }}
      title="Faturamentos"
      extra={
        <Space>
          <Tooltip title="Atualizar">
            <Button icon={<ReloadOutlined />} onClick={() => refetch()} />
          </Tooltip>
          <Tooltip title="Novo Faturamento">
            <Button type="primary" icon={<PlusOutlined />} />
          </Tooltip>
        </Space>
      }
      styles={{ body: { width: '100%', overflow: 'hidden' } }}
    >
      <Master
        faturamentos={mockMaster}
      />
    </Card>
  );
}

export default App
