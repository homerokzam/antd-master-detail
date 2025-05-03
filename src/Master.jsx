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

  // Estilos inline para substituir as classes CSS
  const masterTableContainerStyle = {
    width: '100%'
  };

  const detailTableContainerStyle = {
    margin: 0,
    width: '100%',
    overflow: 'visible', 
    padding: '10px',
    position: 'relative'
  };

  // Função para gerar uma chave única para cada linha
  const getRowKey = (record) => {
    // Verifica se o registro tem um ID
    if (record.id) return record.id;
    
    // Caso não tenha ID, cria uma chave baseada em outras propriedades
    return `${record.descricao}-${record.tipo}-${Math.random()}`;
  };

  // Função para renderizar conteúdo expandido com container de tamanho fixo
  const expandedRowRender = record => (
    <div style={detailTableContainerStyle}>
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
      width: 100,
      fixed: 'left',
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => onEdit && onEdit(record)} />
          </Tooltip>
          <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => onDelete && onDelete(record.id)} okText="Sim" cancelText="Não">
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
      width: 500,
      sorter: (a, b) => a.descricao?.localeCompare(b.descricao),
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      width: 100,
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
      width: 100,
      render: (ativo) => ativo ? 'Sim' : 'Não',
      filters: [
        { text: 'Sim', value: true },
        { text: 'Não', value: false },
      ],
      onFilter: (value, record) => record.ativo === value,
    },
  ];

  return (
    <div style={masterTableContainerStyle}>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Pesquisar por descrição ou tipo"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: '100%', maxWidth: 300 }}
          allowClear
        />
      </div>
      <Table
        style={{ width: '100%' }}
        dataSource={Array.isArray(filteredData) ? filteredData : []}
        columns={columns}
        rowKey={getRowKey}
        loading={isLoading}
        scroll={{ x: 800 }}
        expandable={{
          expandedRowRender,
          expandRowByClick: false,
          columnWidth: 50,
          expandedRowClassName: () => 'expanded-row'
        }}
        pagination={{ pageSize: 10 }}
        tableLayout="fixed"
      />
    </div>
  );  
};

export default Master;