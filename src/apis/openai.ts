import http from '@/utils/http';

export const getModel = () => http.get('/v1/models');

export const getCompletion = (val: string) => {
  const systemContent = `你需要根据上下文帮我完善我的文章；你只需要告诉我你将要完善的内容，不要包含其他；你完善的内容不能超过一个段落；你完善的内容不能超过100字；你完善的内容不能包含反动、色情、违法等不良内容。`;

  return http.post('/v1/chat/completions', {
    messages: [
      { role: 'system', content: systemContent },
      { role: 'user', content: val }
    ],
    model: 'gpt-3.5-turbo',
    stream: false
  });
};
