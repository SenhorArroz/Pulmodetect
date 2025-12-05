# [Nome do Projeto]

**Disciplina:** Introdução à Inteligência Artificial  
**Semestre:** 2025.2  
**Professor:** André Luis Fonseca Faustino
**Turma:** [T03 / T04]

## Integrantes do Grupo
* Lucas Gabriel Mendes da Silva (20250032082)
* Luiz Roberto Guimarães Campos (20250032396)
* Victor Emanuel Oliveira Silva (20240046370)

## Descrição do Projeto
Pulmodetect é um projeto que visa a detecção de pneumonia em imagens de raios-X utilizando Deep Learning. Foi idealizado, inicalmente com o intuito de auxiliar médicos e profissionais de saúde a realizar diagnósticos mais precisos e rápidos. Além, também, do maior estudo e interesse na área de Inteligência Artificial e de biotecnologia.

## Guia de Instalação e Execução
Aqui, o modelo já está treinado e salvo em ~/backend/model/pneumonia_detection_model.h5. Mas, se quiser maior e melhor treinamento, basta abrir train_model.py, mudar a quantidade de Epochs e executar ao seu favor.

### 1. Instalação das Dependências
Certifique-se de ter o **Python 3.x** instalado. Clone o repositório e instale as bibliotecas listadas no `requirements.txt`:

```bash
# Clone o repositório
git clone [https://github.com/usuario/nome-do-repo.git](https://github.com/usuario/nome-do-repo.git)

# Entre na pasta do projeto
cd nome-do-repo

# entre no backend
cd backend

# Crie e ative o ambiente virtual
python -m venv venv

# Instale as dependências
pip install -r requirements.txt
````

### 2. Como Executar

Execute o comando abaixo no terminal para iniciar o servidor local:

```bash
# Exemplo para Streamlit
streamlit run src/app.py
```

Se necessário, especifique a porta ou url de acesso, ex: http://localhost:8501

## Estrutura dos Arquivos

[Descreva brevemente a organização das pastas]

  * `src/`: Código-fonte da aplicação ou scripts de processamento.
  * `notebooks/`: Análises exploratórias, testes e prototipagem.
  * `data/`: Datasets utilizados (se o tamanho permitir o upload).
  * `assets/`: Imagens, logos ou gráficos de resultados.

## Resultados e Demonstração

[Adicione prints da aplicação em execução ou gráficos com os resultados do modelo/agente. Se for uma aplicação Web, coloque um print da interface.]

## Referências

  * [Link para o Dataset original]
  * [Artigo, Documentação ou Tutorial utilizado como base]
