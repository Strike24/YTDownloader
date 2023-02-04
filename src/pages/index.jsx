import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import {
  Input,
  Checkbox,
  Button,
  SegmentedControl,
  Center,
  Box,
  Tooltip,
} from "@mantine/core";
import { Download, Video, BrandSoundcloud, Check, Ce } from "tabler-icons-react";
import { showNotification, updateNotification } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [invalid, setInvalid] = useState(false);
  const [format, setFormat] = useState("mp3");

  async function convertToMp3() {
    //get the youtube link from the input with the id youtubelink
    const youtubeLink = document.getElementById("youtubelink").value;
    if (!youtubeLink) return setInvalid(true);
    //redirect to another web page
    const response = await fetch(
      `/api/download?link=${youtubeLink}&format=${format}`
    );
    if (response.status === 400) return setInvalid(true);
    window.location.href = `api/download?link=${youtubeLink}&format=${format}`;
    showNotification({
      color: "teal",
      title: "File Downloaded Successfully ✅",
      message: "Hope you are having a good day! 😉",
      icon: <Check size={16} />,
      autoClose: 2000,
      id: "download",
    });
  }

  return (
    <>
      <Head>
        <title>YouTube Audio Downloader 🔁</title>
        <meta
          name="description"
          content="Youtube Audio to MP3, Created by: Strike#1800"
        />
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
              Convert AUDIO from YouTube to MP3
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
                placeholder="Your YouTube Video Link"
                onClick={() => setInvalid(false)}
                size="md"
                style={{ paddingBottom: "0.5rem" }}
                invalid={invalid}
              />
              <SegmentedControl
                value={format}
                onChange={setFormat}
                data={[
                  {
                    label: (
                      <Center>
                          <Video size={16} />
                        <Box ml={10}>MP4 ❌</Box>
                      </Center>
                    ),
                    disabled: true,
                    value: "mp4",
                  },
                  {
                    label: (
                      <Center>
                        <BrandSoundcloud size={16} />
                        <Box ml={10}>MP3</Box>
                      </Center>
                    ),
                    value: "mp3",
                  },
                ]}
              />
            </Input.Wrapper>
            <Button
              style={{ marginTop: "1.5rem" }}
              onClick={convertToMp3}
              leftIcon={<Download></Download>}
            >
              Download as {format.toUpperCase()}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
