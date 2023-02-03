import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import {
  Input,
  Checkbox,
  Button,
  Group,
  Box,
  Text,
  Tooltip,
} from "@mantine/core";
import { Download, AlertCircle } from "tabler-icons-react";

const inter = Inter({ subsets: ["latin"] });



export default function Home() {
  const [invalid, setInvalid] = useState(false);


async function convertToMp3() {
  //get the youtube link from the input with the id youtubelink
  const youtubeLink = document.getElementById("youtubelink").value;
  console.log(youtubeLink);
  //redirect to another web page
  window.location.href = `api/download?link= + ${youtubeLink}`;

}

  return (
    <>
      <Head>
        <title>YouTube Audio Downloader 🔁</title>
        <meta name="description" content="Youtube Audio to MP3, Created by: Strike#1800" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
              Youtube to MP3 🔁
            </h1>
            <p style={{ textAlign: "center" }}>
              Convert audio from YouTube to MP3
            </p>
          </div>
        </div>
        <div className={styles.mainLeft}>
          <div>
            <Input.Wrapper
            label="YouTube Video Link"
            description="Please enter a valid YouTube video link."
            >
              <Input
                id="youtubelink"
                variant="filled"
                placeholder="https://www.youtube.com/watch"
                size="md"
                style={{ paddingBottom: "1rem" }}
                invalid={invalid}
              />
            </Input.Wrapper>
            <Button onClick={convertToMp3} leftIcon={<Download></Download>}> Download as MP3</Button>
          </div>
        </div>
      </main>
    </>
  );
}
