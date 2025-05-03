import { useEffect, useState } from 'react';
import { Table, Button, Tooltip, Space, message, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { mockDetail } from './mockTables';

const FaturamentoItemsTable = ({ faturamentoId }) => {
  const [searchText, setSearchText] = useState('');
  
  // Estilos inline para substituir as classes CSS
  const detailContentStyle = {
    width: '100%',
    padding: '10px 0'
  };

  const detailTableScrollStyle = {
    width: '100%',
    overflow: 'auto'
  };

  // Filtra os itens com base no texto de pesquisa
  const filteredItems = searchText
    ? mockDetail.filter(item => 
        item.descricao?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.codigoTUSS?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.codigoTISS?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.descricaoUnidade?.toLowerCase().includes(searchText.toLowerCase())
      )
    : mockDetail;

  const itemColumns = [
    {
      title: '',
      key: 'acoes',
      fixed: 'left',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar Item">
            <Button icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Excluir Item">
            <Button icon={<DeleteOutlined />} danger size="small" />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Código TUSS',
      dataIndex: 'codigoTUSS',
      key: 'codigoTUSS',
      width: 120
    },
    {
      title: 'Código TISS',
      dataIndex: 'codigoTISS',
      key: 'codigoTISS',
      width: 120
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: 300
    },
    {
      title: 'Honorário',
      dataIndex: 'valorHonorario',
      key: 'valorHonorario',
      width: 120,
      render: (valor) => valor ? `R$ ${parseFloat(valor).toFixed(2)}` : '-',
    },
    {
      title: 'Operacional',
      dataIndex: 'valorOperacional',
      key: 'valorOperacional',
      width: 120,
      render: (valor) => valor ? `R$ ${parseFloat(valor).toFixed(2)}` : '-',
    },
    {
      title: 'Total',
      dataIndex: 'valorTotal',
      key: 'valorTotal',
      width: 120,
      render: (valor) => valor ? `R$ ${parseFloat(valor).toFixed(2)}` : '-',
    },
    {
      title: 'Medicamento',
      dataIndex: 'codigoMedicamentoId',
      key: 'codigoMedicamentoId',
      width: 120
    },
    {
      title: 'Início Vigência',
      dataIndex: 'inicioVigencia',
      key: 'inicioVigencia',
      width: 120
    },
    {
      title: 'Fim Vigência',
      dataIndex: 'fimVigencia',
      key: 'fimVigencia',
      width: 120
    },
    {
      title: 'Quantidade Embalagem',
      dataIndex: 'quantidadeEmbalagem',
      key: 'quantidadeEmbalagem',
      width: 120
    },
    {
      title: 'Unidade',
      dataIndex: 'descricaoUnidade',
      key: 'descricaoUnidade',
      width: 120
    },
    {
      title: 'Ativo',
      dataIndex: 'ativo',
      key: 'ativo',
      width: 120,
      render: (ativo) => ativo ? 'Sim' : 'Não'
    }
  ];

  return (
    <div style={detailContentStyle}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10, 
        width: '100%', 
        minHeight: 32,
        flexWrap: 'nowrap'
      }}>
        <div style={{ flex: '0 0 auto' }}>
          <h4 style={{ margin: 0 }}>Itens do Faturamento</h4>
        </div>
        <div style={{ flex: '0 0 auto', minWidth: 130, marginLeft: 'auto' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="small"
          >
            Adicionar Item
          </Button>
        </div>
      </div>
      
      {mockDetail.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Não há itens cadastrados para este faturamento.</p>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 10 }}>
            <Input
              placeholder="Pesquisar por descrição, código TUSS, código TISS ou unidade"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: '100%', maxWidth: 400 }}
              allowClear
              size="small"
            />
          </div>
          <div style={detailTableScrollStyle}>
            <Table
              style={{ width: '100%' }}
              columns={itemColumns}
              dataSource={filteredItems}
              pagination={{ pageSize: 10, size: 'small' }}
              rowKey={(record, index) => `${record.codigo || ''}${index}`}
              size="small"
              scroll={{ x: 1800 }}
              tableLayout="fixed"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FaturamentoItemsTable;