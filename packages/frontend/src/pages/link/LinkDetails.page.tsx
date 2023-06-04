import {
  Box,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { TbDownload, TbExternalLink, TbFold, TbQrcode } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';

import { NavButton } from '../../components/button/NavButton';
import { IconLabel } from '../../components/common/IconLabel';
import { UrlField } from '../../components/common/UrlField';
import { ClickChart } from '../../components/link/ClickChart';
import { SHORTENED_BASE_URL } from '../../config/environment.config';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useDeleteLink } from '../../network/link/useDeleteLink.network';
import { useLink } from '../../network/link/useLink.network';
import { getQrcodeUrl } from '../../utils/getQrcodeUrl';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function LinkDetailsPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useLink(id || '');
  const {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    mutate,
  } = useDeleteLink(id, () => navigate(UIPaths.LINK));
  const qrUrl = useMemo(() => {
    if (!SHORTENED_BASE_URL || !data) return;
    return getQrcodeUrl(joinPath(SHORTENED_BASE_URL, data.shortId));
  }, [data]);
  if (isLoading) return <LoadingPage />;
  if (!data || !id || isError || isDeleteError) return <ErrorPage />;
  const onDelete = () => {
    mutate(undefined);
  };
  return (
    <Page title={data.name || l('title.unknown')} isLoading={isLoading}>
      <CardBody>
        <VStack w='100%' align='flex-start' spacing={5}>
          <Box>
            <IconLabel text={l('page.linkDetails.fullUrl')} icon={<TbExternalLink />} />
            <UrlField url={data.url} />
          </Box>
          {SHORTENED_BASE_URL && (
            <>
              <Box>
                <IconLabel text={l('page.linkDetails.shortenedUrl')} icon={<TbFold />} />
                <UrlField url={joinPath(SHORTENED_BASE_URL, data.shortId)} />
              </Box>
            </>
          )}
          {qrUrl && (
            <Button onClick={onOpen} leftIcon={<TbQrcode />}>
              {l('page.linkDetails.qrCode')}
            </Button>
          )}
          <ClickChart timestamps={data.timestamps} />
        </VStack>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NavButton to={joinPath(UIPaths.LINK, id, 'edit')}>{l('button.edit')}</NavButton>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme='red' variant='ghost'>
                {l('button.delete')}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverArrow />
              <PopoverBody>
                <Text>{l('header.confirmDelete')}</Text>
              </PopoverBody>
              <PopoverFooter>
                <ButtonGroup>
                  <Button isLoading={isDeleteLoading} onClick={onDelete} colorScheme='red' variant='ghost'>
                    {l('button.delete')}
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
      </CardFooter>
      {qrUrl && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <VStack p={5}>
                  <Image src={qrUrl} borderRadius={5} />
                  <Button as='a' href={qrUrl} download='shorz-qr.png' leftIcon={<TbDownload />}>
                    {l('page.linkDetails.qrCode.download')}
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </Page>
  );
}
