import React, { ReactElement } from "react"
import styled from '@emotion/styled'
import Img, { FixedObject } from "gatsby-image"
import { sampleBase64 } from "../../utils/sampleBase64"
import { graphql, StaticQuery } from 'gatsby'
import ThreeWayAnimation from "./ThreeWayAnimation"
import Button from "../Atoms/Button"

type ArticleCardProps = {
    image: FixedObject,
    title: string,
    text: string,
    orientation: boolean,
    theme: string,
    themeImage: string
}

const defaultProps = {
    image: sampleBase64,
    title: "Lorem Ipsum",
    /* 180 characters */
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus vel facilisis volutpat est velit. Lobortis sceler.",
    theme: 'pink',
    themeImage: 'machine'
}

const ArticleContainer = styled.div`
    display: flex;
    flex-direction: row;

    margin: 2rem;
    height: 400px;
    width: 970px;

    padding: 0 1rem 0 2rem;

    background-color: var(--color-veryDarkPurple);
    border-radius: 5px;
    box-shadow: inset 1px 1px 10px rgba(0, 0, 0, 0.25);

     p, h1 {
        color: var(--color-almostWhite);
    }

    h2 {
        text-transform: uppercase;
        font-weight: 400;
    }

    p {
        font-size: var(--font-size-p);
        font-family: var(--font--family-secondary);
        line-height: 130%;
        margin-bottom: 2rem;
        opacity: 0.9;
    }
`

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: ${p => p.orientation ? '2rem' : '1rem'};
    padding-left: ${p => !p.orientation ? '2rem' : '2rem'};
`

const ArticleCard = ({ orientation, title, text, theme, themeImage }: ArticleCardProps): ReactElement => (

    <StaticQuery
        query={
            graphql`
                query {
                    del: file(relativePath: { eq: "delimiter-orange.png" }) {
                        childImageSharp {
                            fixed(quality: 90) {
                            ...GatsbyImageSharpFixed
                            }
                        }
                    }
                }`
            }
        render={data => (
        <ArticleContainer >
            {orientation &&
                <ThreeWayAnimation themeImage={themeImage}></ThreeWayAnimation>
            }
            <CardContent orientation={orientation}>
                <h2>{title}</h2>
                <Img fixed={data.del.childImageSharp.fixed}></Img>
                <p>{text}</p>
                <Button theme={theme}></Button>
            </CardContent>
            {!orientation &&
                <ThreeWayAnimation themeImage={themeImage}></ThreeWayAnimation>
            }
        </ArticleContainer>
        )}
    />
    )



ArticleCard.defaultProps = defaultProps
export default ArticleCard