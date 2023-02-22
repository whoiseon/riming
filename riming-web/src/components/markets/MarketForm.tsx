import styled from '@emotion/styled';
import LabelInput from '../system/LabelInput';
import Button from '@/components/system/Button';
import LabelImage from '@/components/system/LabelImage';
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { marketFormErrors } from '@/lib/marketFormErrors';

function MarketForm() {
  const [attachment, setAttachment] = useState('');
  const [defaultImage, setDefaultImage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      marketName: '',
      marketTag: '',
    },
  });

  const toggleDefaultImage = useCallback(() => {
    setDefaultImage((prev) => !prev);
    setAttachment('');
  }, []);

  const onChangeImage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    const image: any = files && files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(image);
  }, []);

  const onSubmit = useCallback(
    (data: any) => {
      if (!defaultImage && !attachment) {
        console.log('이미지를 등록해주세요');
        return;
      }
      console.log({
        ...data,
        marketTag: data.marketTag.split(' '),
      });
    },
    [defaultImage, attachment],
  );

  return (
    <Block onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <LabelImage
          label="대표 이미지"
          id="market-image"
          accept="image/*"
          onChange={onChangeImage}
          preview={attachment}
          disabled={defaultImage}
          checked={defaultImage}
          toggleDefaultImage={toggleDefaultImage}
        />
        <LabelInput
          type="text"
          name="marketName"
          label="마켓 이름"
          placeholder="2자 이상 16자 이하로 입력해주세요"
          register={register}
          errors={errors.marketName}
          option={marketFormErrors.marketName}
          required
        />
        <LabelInput
          type="text"
          name="marketTag"
          label="마켓 태그"
          placeholder="띄어쓰기를 이용해 5개까지 입력해주세요 ex) #리밍 #마켓"
          register={register}
          errors={errors.marketTag}
        />
      </InputGroup>
      <ActionsBox>
        <Button type="submit" layoutmode="fullWidth">
          만들기
        </Button>
      </ActionsBox>
    </Block>
  );
}

const Block = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  gap: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

export default MarketForm;
