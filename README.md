# [Pulmodetect]

**Disciplina:** Introdução à Inteligência Artificial  
**Semestre:** 2025.2  
**Professor:** André Luis Fonseca Faustino
**Turma:** T04

## Integrantes do Grupo
* Lucas Gabriel Mendes da Silva (20250032082)
* Luiz Roberto Guimarães Campos (20250032396)
* Victor Emanuel Oliveira Silva (20240046370)

## Descrição do Projeto
Pulmodetect é um projeto que visa a detecção de pneumonia em imagens de raios-X utilizando Deep Learning. Foi idealizado, inicalmente com o intuito de auxiliar médicos e profissionais de saúde a realizar diagnósticos mais precisos e rápidos. Além, também, do maior estudo e interesse na área de Inteligência Artificial e de biotecnologia.

## Guia de Instalação e Execução
Deverá, de início, instalar o pyenv, que é um gerenciador de versões do Python. Adiante, deverá instalar o Python 3.11.9. Depois, deverá instalar o Node.js na pasta frontend. Daí, treinar o modelo, que está na pasta backend; e, por fim, iniciar o servidor local.

### 1. Instalação das Dependências
Certifique-se de ter o **Python 3.11.9** instalado. Clone o repositório e instale as bibliotecas listadas no `requirements.txt`:
Certifique-se de ter o **Node.js** instalado.

```bash
# Clone o repositório
git clone https://github.com/SenhorArroz/Pulmodetect.git

# Entre na pasta do projeto
cd Pulmodetect

# entre no backend
cd backend

# Crie e ative o ambiente virtual
python -m venv venv
venv\Scripts\activate

# vá no backend/venv/pyvenv.confi
# mude o python para 3.11.9
# se não tiver, instale o python 3.11.9 e mude o diretório no pyvenv.conf para o executável do python

# Instale as dependências
pip install -r requirements.txt

#vá para o frontend
cd ..
cd frontend

# Instale as dependências
npm install

#configurando e treinando o modelo: 
#volte para backend
cd ..
cd backend

#execute o treinamento
python train_model.py

### 2. Como Executar

Execute o comando abaixo no terminal para iniciar o servidor local:

# em backend: 
cd backend
python main.py

# em frontend:
cd frontend
npm run dev

```

## Estrutura dos Arquivos

  * `backend/`: scripts de processamento.
  * `frontend/`: interface do usuário.
  * `model/`: modelo treinado.
```

# Resultados e Demonstração

Interface inicial
<img width="1137" height="935" alt="Image" src="https://github.com/user-attachments/assets/0aced499-b7b2-442f-b167-7bac1bd0469c" />

Interface de upload de imagem
<img width="1032" height="654" alt="Image" src="https://github.com/user-attachments/assets/80efcd26-b262-4520-810c-61c884ccf71d" />

<img width="1027" height="646" alt="Image" src="https://github.com/user-attachments/assets/1ba0aef5-5310-4dc3-b09f-675abe4f0fa2" />

```

## Referências

  * [Dataset original](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)
  * [Curso Next.js](https://www.youtube.com/watch?v=XHrbg2iYNCg&list=PLnDvRpP8BnezfJcfiClWskFOLODeqI_Ft)
  * [Curso FastAPI](https://www.youtube.com/watch?v=HJ314MNcCck)
```

