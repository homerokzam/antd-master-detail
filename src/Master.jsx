import { useState } from 'react';
import { Table, Button, Tooltip, Popconfirm, Space, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Detail from './Detail';

const Master = ({ 
  faturamentos = [], 
  isLoading, 
  onEdit, 
  onDelete 
}) => {
  const [searchText, setSearchText] = useState('');

  // Função para gerar uma chave única para cada linha
  const getRowKey = (record) => {
    // Verifica se o registro tem um ID
    if (record.id) return record.id;
    
    // Caso não tenha ID, cria uma chave baseada em outras propriedades
    return `${record.descricao}-${record.tipo}-${Math.random()}`;
  };

  // Função para renderizar conteúdo expandido
  const expandedRowRender = record => (
    <div style={{ margin: 0 }}>
      <Detail faturamentoId={record.id} />
    </div>
  );
  
  // Filtra os dados com base no texto de pesquisa
  const filteredData = searchText
    ? faturamentos.filter(item => 
        item.descricao?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.tipo?.toLowerCase().includes(searchText.toLowerCase())
      )
    : faturamentos;
  
  const columns = [
    {
      title: '',
      key: 'acoes',
      width: '10%',
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          </Tooltip>
          <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => onDelete(record.id)} okText="Sim" cancelText="Não">
            <Tooltip title="Excluir">
              <Button icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: '70%',
      sorter: (a, b) => a.descricao?.localeCompare(b.descricao),
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      width: '10%',
      filters: [
        { text: 'A', value: 'A' },
        { text: 'B', value: 'B' },
      ],
      onFilter: (value, record) => record.tipo === value,
    },
    {
      title: 'Ativo',
      dataIndex: 'ativo',
      key: 'ativo',
      width: '10%',
      render: (ativo) => ativo ? 'Sim' : 'Não',
      filters: [
        { text: 'Sim', value: true },
        { text: 'Não', value: false },
      ],
      onFilter: (value, record) => record.ativo === value,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Pesquisar por descrição ou tipo"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
      </div>
      <Table
        dataSource={Array.isArray(filteredData) ? filteredData : []}
        columns={columns}
        rowKey={getRowKey}
        loading={isLoading}
        expandable={{
          expandedRowRender,
          expandRowByClick: false,
        }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );  
};

export default Master;