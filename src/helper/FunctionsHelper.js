export const pegarDataMaisRecente = (positions) => {
  return positions.reduce((maisRecente, posicao) => {
    const dataPosicao = new Date(posicao.date);
    if (!maisRecente || dataPosicao > maisRecente) {
      maisRecente = posicao;
    }
    return maisRecente;
  }, null);
}