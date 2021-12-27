import { useState } from "react"
import { styled, globalCss } from "@stitches/react"

const globalStyles = globalCss({
  body: {
    "-webkit-font-smoothing": "antialiased",
    fontFamily: "sans-serif",
    backgroundColor: "GhostWhite",
  },
})

const Wrapper = styled("div", {
  display: "grid",
  placeItems: "center",
  minHeight: "100vh",
  padding: "4rem",
})

const Container = styled("main", {
  textAlign: "center",
})

const Heading = styled("h1", {
  fontSize: "18px",
  fontWeight: 500,
  color: "#8d90bb",
  textTransform: "uppercase",
  marginBottom: "2rem",
})

const Button = styled("button", {
  fontSize: "16px",
  background: "#3d4281",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "6px",
  opacity: "0.9",
  marginBottom: "2rem",
  "&:hover": {
    opacity: "1",
  },
})

const ImgGrid = styled("ul", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "12px",
  marginTop: "32px",
})

const NFTImg = styled("img", {
  width: "100%",
})

const Home = () => {
  globalStyles()
  const [currentAccount, setCurrentAccount] = useState(null)
  const [nfts, setNfts] = useState(null)

  const getAssets = async (walletAddr) => {
    const options = { method: "GET" }

    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${walletAddr}&order_direction=desc&offset=0&limit=20`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setNfts(response)
      })
      .catch((err) => console.error(err))
  }

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        accountChangedHandler(res[0])
        getAssets(res[0])
      })
    } else {
      console.log("no metamask")
    }
  }

  const accountChangedHandler = (newAccount) => {
    setCurrentAccount(newAccount)
  }

  return (
    <Wrapper>
      <Container>
        <Heading>web3-react testing</Heading>
        <Button onClick={connectWalletHandler}>Connect Wallet</Button>
        <p>{`Current account: ${currentAccount}`}</p>
        <ImgGrid>
          {nfts &&
            nfts.assets.map((asset) => {
              return (
                <li key={asset.id}>
                  <NFTImg
                    src={asset.image_preview_url}
                    alt={asset.description}
                  />
                </li>
              )
            })}
        </ImgGrid>
      </Container>
    </Wrapper>
  )
}

export default Home
