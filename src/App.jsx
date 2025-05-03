import { useState, useEffect } from 'react';
import { Button, Tooltip, Space, message, Card, ConfigProvider } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Master from './Master';
import { mockMaster } from './mockTables';

function App() {
  const [count, setCount] = useState(0)

  const refetch = () => {
    message.success('Dados atualizados com sucesso!');
  };

  // Estilos inline para substituir as classes CSS
  const appContainerStyle = {
    width: '100%',
    maxWidth: '100%',
    textAlign: 'left'
  };

  const masterDetailContainerStyle = {
    width: '100%',
    overflow: 'visible',
    padding: '0'
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            expandedRowBg: '#f5f5f5',
            borderColor: '#e8e8e8',
          }
        }
      }}
    >
      <div style={appContainerStyle}>
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
          styles={{ 
            body: { 
              width: '100%', 
              overflow: 'visible', 
              padding: '16px' 
            } 
          }}
        >
          <div style={masterDetailContainerStyle}>
            <Master
              faturamentos={mockMaster}
            />
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
}

export default App
