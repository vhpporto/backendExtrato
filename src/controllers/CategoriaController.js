const db = require("../database/connection");

module.exports = {
  async despesas(req, res) {
    const sql = `select 
	count(1) as Total,
	C.Descricao,
	C.Cor,
	sum(E.Valor) as ValorTotal,
	sum(E2.Valor),
			(select sum(Valor) from Extrato where MONTH(Data_Lancamento) = 4 and Entrada = 0 ) as TotalDespesa
		from Extrato E
		join Categoria C on C.Tipo = E.Categoria
		join Extrato E2 on E2.id = E.id
		where E.Entrada = 0
		group by  C.Descricao, C.Cor`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  },
  async receitas(req, res) {
    const sql = `select count(1) as Total, C.Descricao, C.Cor
    from Extrato E
    join Categoria C on C.Tipo = E.Categoria
    where Entrada = 1
    group by  C.Descricao, C.Cor`;

    db.query(sql, (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  },
};
